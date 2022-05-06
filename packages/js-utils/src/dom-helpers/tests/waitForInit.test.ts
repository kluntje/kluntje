import { waitForEvent } from '../lib/waitForEvent';
import { waitForInit } from '../lib/waitForInit';

jest.mock('../lib/waitForEvent', () => ({
  waitForEvent: jest.fn(() => Promise.resolve()),
}));

describe('waitForInit tests:', () => {
  let mockComponent: any;

  beforeEach(() => {
    mockComponent = document.createElement('div');
  });

  test('should resolve immediately, if state initialized is true', async () => {
    mockComponent.state = { initialized: true };
    await expect(waitForInit(mockComponent)).resolves.toBeUndefined();
    expect(waitForEvent).not.toBeCalled();
  });

  test('should wait for kl-component-initialized event (for max 3000ms), when state initialized is false', async () => {
    mockComponent.state = { initialized: false };
    await waitForInit(mockComponent);
    expect(waitForEvent).toBeCalledWith(mockComponent, 'kl-component-initialized', 3000);
  });
});
