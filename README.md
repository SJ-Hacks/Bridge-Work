# 💡 BridgeWorks: Empowering Homeless Communities through Gigs and Goodwill

BridgeWorks is a platform that empowers homeless individuals by connecting them with short-term gigs and community service opportunities. It builds a reputation score over time, fostering pathways to employment, housing, and dignity, while strengthening community bonds in San José.

---

# Live Link
http://ec2-54-89-21-90.compute-1.amazonaws.com/
---

## ✨ Tech Stack

| Layer             | Technology                             |
| ----------------- | -------------------------------------- |
| Frontend          | React.js + Redux Toolkit + Material UI |
| Backend           | FastAPI (Python)                       |
| Database          | MongoDB (Dockerized)                   |
| Deployment        | Docker Compose + AWS EC2               |
| CI/CD             | GitHub Actions + Docker Hub            |
| Authentication    | JWT / Oauth2                           |
| GenAI Integration | OpenAI API / Llama 3                   |

---

## 👩‍💻 Project Structure

```
.
├── frontend/         # React.js frontend application
├── backend/          # FastAPI backend application
├── deployment/       # Docker Compose and GitHub Actions
```

---

## 🔧 Local Development Setup

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Production Deployment

- Dockerize frontend, backend, MongoDB.
- Push images to Docker Hub.
- Host everything on AWS EC2 (Amazon Linux).
- GitHub Actions auto-deploys on every push to `main`:
  - SSH to EC2
  - Pull latest images
  - Restart containers with `docker-compose.prod.yml`

---

## 🔄 CI/CD Pipeline (GitHub Actions)

- Build backend and frontend images.
- Push images to Docker Hub.
- SSH into EC2 instance.
- Pull new Docker images.
- Restart containers automatically.

---

## 🌐 Live URL

> [http://ec2-54-89-21-90.compute-1.amazonaws.com/](http://ec2-54-89-21-90.compute-1.amazonaws.com/)

---

## 📈 Core Features

- Simple Profile Creation
- Browse & Apply for Gigs, Volunteer Opportunities, Full-Time Jobs
- Reputation & Points System
- Reward Redemption System
- Admin Dashboard for City/Nonprofits
- GenAI-powered Resume Builder

---

## 🔬 Social Impact Goals

- Rebuild work experience for homeless individuals.
- Reward positive contributions to the community.
- Foster dignity, trust, and empowerment.
- Strengthen social bonds in San José and beyond.

---

## 📊 Metrics to Track

- Number of Gigs Completed
- Reputation Growth
- Shelter/Service Redemptions
- Success Stories

---

## 🚫 Common Challenges (Handled Carefully)

- Ensuring fair gigs, preventing exploitation
- Privacy and dignity protection
- Offline accessibility planning
- Future portability of reputation scores to other platforms

---

## 📅 Future Enhancements

- Full mobile-first app with React Native
- External MongoDB (Atlas) for horizontal scaling
- SSL setup with Let's Encrypt
- Nginx reverse proxy for secure hosting
- Offline app mode for low-connectivity users
- Advanced GenAI integration for skill suggestions

---

## 📄 License

Open-sourced for learning and social impact purposes.

---

# 🌟 Special Thanks

- SJ Hacks
- Homeless Outreach Organizations
- City of San José

---

# 🌟 Star this project if you find it inspiring!



---

# 🏆 Let's build dignity through technology!

