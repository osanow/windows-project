exports.get404 = (req, res) => {
  console.log('get404');
  res.status(404).json({ error: 'Invalid API endpoint' });
};
