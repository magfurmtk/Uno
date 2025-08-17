# Uno

# Union (UNO) Token & UnionPool

**Custom token UNION (UNO)** dengan fitur:  
- Faucet dengan batasan klaim dan cap  
- Merge deposit dengan reward harian (halving & doubling otomatis)  
- Referral system 10% reward  
- Claim reward dengan 2% fee protocol ke owner  
- History event listener backend + API  
- Frontend React + Tailwind profesional dengan grafik dan pagination  

---

## 📦 Struktur Repo

/contracts
├─ Union.sol # Token + Proxy + Faucet + Union logic
├─ UnionPool.sol # Pool logic

/backend
├─ listener.js # Backend event listener (ethers.js)
/frontend
├─ src # React + Tailwind UI
├─ public
├─ package.json
/scripts
├─ deploy.js # Hardhat deploy scripts
.env # Config env variables
README.md

yaml
Copy code

---

## 🚀 Deployment

### 1. Deploy Smart Contract

- Install dependencies:

```bash
npm install --save-dev hardhat @openzeppelin/contracts ethers dotenv
Setup .env dengan:

ini
Copy code
RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
Deploy:

bash
Copy code
npx hardhat run scripts/deploy.js --network rinkeby
Catat address contract Union & UnionPool

2. Backend Listener & API
Masuk folder backend

bash
Copy code
cd backend
npm install
Buat .env:

ini
Copy code
RPC_URL=your_rpc_url
UNION_ADDRESS=deployed_union_address
PORT=3001
Jalankan listener dan server:

bash
Copy code
node listener.js
node server.js
Disarankan menggunakan pm2 agar service selalu aktif

3. Frontend React + Tailwind
Masuk folder frontend

bash
Copy code
cd frontend
npm install
Buat .env.local atau update config untuk API URL dan contract addresses

Jalankan development server:

bash
Copy code
npm start
Build production:

bash
Copy code
npm run build
Deploy folder build/ ke hosting static seperti Vercel/Netlify/Firebase

⚙️ Konfigurasi
Faucet settings: owner dapat set jumlah, cap, dan start faucet

Union Pool: start merge, reward pool, halving/doubling otomatis

Referral: 10% reward otomatis setiap deposit referral

Claim reward: 2% fee protocol ke owner address

📈 Features Frontend
Connect wallet (Metamask, WalletConnect, Phantom, dll)

Dashboard: show balance, TVL, APY, total merged

Faucet claim with cap & amount

Union merge deposit

Claim reward & referral rewards

History paginated & reward chart per user

Professional UI with Tailwind + sidebar navigation

💡 Notes
Contract event history disimpan via backend listener API

Unlimited halving & doubling otomatis sesuai pool reward

Token supply fixed 1,000,000 with 6 decimals

Backend menggunakan Express + ethers.js untuk listen event & API

🔗 Useful commands
bash
Copy code
# Deploy contracts
npx hardhat run scripts/deploy.js --network rinkeby

# Start backend
cd backend
npm install
node listener.js
node server.js

# Start frontend dev
cd frontend
npm install
npm start

# Build frontend prod
npm run build
