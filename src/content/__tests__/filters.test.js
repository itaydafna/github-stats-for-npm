import { addCommas, formatDate } from '../filters';
describe('filters', () => {
  describe('addCommas', () => {
    it('returns a comma separated string version on a number with more than 3 characters', () => {
      const result = addCommas(9999);
      expect(result).toEqual('9,999');
    });
    it('returns an empty string in case no value is passed', () => {
      const result = addCommas();
      expect(result).toEqual('');
    });
    it('does not add commas in case a number with less than 3 characters is passed', () => {
      const result = addCommas(123);
      expect(result).toEqual('123');
    });
    it('handles BIG numbers', () => {
      const result = addCommas(12233334444555556);
      expect(result).toEqual('12,233,334,444,555,556');
    });
  });
  describe('formatDate', () => {
    it('formats timestamp to MMM DD YYYY format', () => {
      const result = formatDate('2018-06-22T13:33:31Z');
      expect(result).toEqual('Jun 22 2018');
    });
    it('returns an empty string in case no value is passed', () => {
      const result = formatDate();
      expect(result).toEqual('');
    });
    it('returns an empty string in case an invalid date string is passed', () => {
      const result = formatDate('ABC');
      expect(result).toEqual('');
    });
  });
});
