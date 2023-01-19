const { default: Web3 } = require('web3');

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DecentralBank', ([owner, customer, customer1]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, 'ether');
  }

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    // ! Question: tại sao khi gọi new, chỗ này có thể tự hiểu owner = msg.sender trong constructor?
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    await rwd.transfer(decentralBank.address, tokens('1000000'));
    await tether.transfer(customer, tokens('400'), { from: owner });
    await tether.transfer(customer1, tokens('100'), { from: customer });
  });

  describe('Mock Tether Deployment', async () => {
    it('matched name successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether Token');
    });

    it('Transfer from owner to customer then from customer to customer 1', async () => {
      const customerBalance = await tether.balanceOf(customer);
      assert.equal(customerBalance.toString(), tokens('300'));
    });

    it('Check Customer1 Balance', async () => {
      const ownerBalance = await tether.balanceOf(customer1);
      assert.equal(ownerBalance.toString(), tokens('100'));
    });

    it('Check Owner Balance', async () => {
      const ownerBalance = await tether.balanceOf(owner);
      assert.equal(ownerBalance.toString(), tokens('999600'));
    });
  });

  describe('Reward Deployment', async () => {
    it('matched name successfully', async () => {
      const name = await rwd.name();
      assert.equal(name, 'Reward Token');
    });
  });

  describe('Decentral Bank Deployment ', async () => {
    it('mached name successfully', async () => {
      const name = await decentralBank.name();
      assert.equal(name, 'Decentral Bank');
    });

    it('Contract has RWD token', async () => {
      const balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance.toString(), '1000000000000000000000000');
    });

    describe('Yield Farming', async () => {
      it('Staking testing', async () => {
        let result;

        /* Check staking for customer
          function approve(address _spender, uint _value) public returns(bool success) {
            allowance[msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value);
            return true;
          }          
          ! Question: Có phải mình không thực sự sở hữu token, 
          !           mà sự sở hữu tokens của mình chỉ được ghi nhận thông qua mapping balanceOf của contract

          ! Question: Có phải chỉ có object của contract (ví dụ tether = Tether.new()) mới gọi approve?

          ! Question: khi truyền {from: customer}, có phải function sẽ ngầm hiểu msg.sender là customer?
        */
        await tether.approve(decentralBank.address, tokens('100'), {
          from: customer,
        });

        /* 
          function depositTokens(uint _amount) public {
            require(_amount > 0, 'amount cannot be 0');
            tether.transferFrom(msg.sender, address(this), _amount);
            stakingBalance[msg.sender] += _amount;

            if(!hasStaked[msg.sender]){
              stakers.push(msg.sender);
            }
            hasStaked[msg.sender] = true;
            isStaked[msg.sender] = true;
          }
        */
        await decentralBank.depositTokens(tokens('100'), { from: customer });

        //Check updated balance of customer;
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens('200'),
          'customer mock wallet balance after staking'
        );

        //Check updated balance of decentralBank;
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(
          result.toString(),
          tokens('100'),
          'Decentral bank balance after staking'
        );
      });

      it('Is staking testing', async () => {
        // Check staking status
        const status = await decentralBank.isStaked(customer);
        assert.equal(status, true);
      });

      it('Has staked testing', async () => {
        // Check staking status
        const status = await decentralBank.hasStaked(customer);
        assert.equal(status, true);
      });

      it('Only owner can issue Tokens', async () => {
        await decentralBank.issueTokens({ from: customer }).should.be.rejected;
      });

      it('Issue reward testing', async () => {
        await decentralBank.issueTokens({ from: owner });
        const rwdBalance = await rwd.balanceOf(customer);

        assert.equal(rwdBalance, '11111111111111111111');
      });

      describe('Unstake Tokens', async () => {
        it('Unstake Tokens', async () => {
          await decentralBank.unstakeTokens({ from: customer });
        });

        it('Checking balance of customer', async () => {
          //Check updated balance of customer;
          result = await tether.balanceOf(customer);
          assert.equal(
            result.toString(),
            tokens('300'),
            'customer mock wallet balance after unstaking'
          );
        });

        it('Checking balance of decentralBank', async () => {
          //Check updated balance of decentralBank;
          result = await tether.balanceOf(decentralBank.address);
          assert.equal(
            result.toString(),
            tokens('0'),
            'Decentral bank balance after unstaking'
          );
        });

        it('Is staking testing', async () => {
          // Check staking status
          const status = await decentralBank.isStaked(customer);
          assert.equal(status, false);
        });
      });
    });
  });
});
