import Vue from 'vue';

export const addCommas = value => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = value => {
  try {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d)) return '';
    return d
      .toDateString()
      .split(' ')
      .slice(1)
      .join(' ');
  } catch (e) {
    return '';
  }
};
