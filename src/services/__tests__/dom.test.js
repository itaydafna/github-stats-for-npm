import { isMounted, pollDOM } from '../dom';

describe('dom service', () => {
  describe('isMounted', () => {
    it('should return true when vue app is present in dom', () => {
      document.body.innerHTML = `
      <div>
        <div id="__gh-stats-for-npm">Vue App lives here..</div> 
      </div>
      `;
      const result = isMounted();
      expect(result).toBeTruthy();
    });
    it('should return false when vue app is not in dom', () => {
      document.body.innerHTML = `
      <div>
        <div id="1234">Vue App doesn't lives here..</div> 
      </div>
      `;
      const result = isMounted();
      expect(result).toBeFalsy();
    });
  });
  describe('pollDOM', () => {
    it('should resolve with the callback return value if the callback returns a truthy value', async () => {
      let from = 0;
      const to = 3;
      function testCallback() {
        from++;
        return from === to;
      }
      await expect(
        pollDOM({
          intervalId: 'Test Interval',
          interval: 100,
          callback: testCallback,
        })
      ).resolves.toBeTruthy();
    });
  });
});
