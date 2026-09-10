import { app } from './server.js';
import { firebaseEnabled } from './src/config/firebase.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\n  SHOP.CO backend running on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`  Firebase: ${firebaseEnabled ? 'ENABLED' : 'MOCK MODE (no credentials)'}\n`);
});
