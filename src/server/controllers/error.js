exports.get404 = (req, res) => {
  res.status(404).json({ error: 'Invalid API endpoint' });
};