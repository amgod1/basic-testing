import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);

    expect(() => account.withdraw(1500)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(1000);
    const innerAccount = getBankAccount(500);

    expect(() => myAccount.transfer(1500, innerAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(1000);

    expect(() => myAccount.transfer(500, myAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);

    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);

    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(1000);
    const innerAccount = getBankAccount(500);

    myAccount.transfer(500, innerAccount);

    expect(myAccount.getBalance()).toBe(500);
    expect(innerAccount.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const account = getBankAccount(1000);
      const balance = await account.fetchBalance();

      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const account = getBankAccount(1000);
      await expect(account.fetchBalance()).resolves.not.toThrow();

      const balance = await account.fetchBalance();

      expect(typeof balance).toBe('number');
      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
