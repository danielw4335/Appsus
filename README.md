
# 📦 Appsus – Full Productivity Suite

Welcome to **Appsus**, a powerful web-based productivity suite built as part of the **Sprint 3 Project**.  
The app combines multiple tools into one platform: a Gmail-style **email client** and a Google Keep-style **note manager**.

---

## 🔗 Live App

Deploy it on GitHub Pages:  
➡️ `https://your-username.github.io/Appsus`

---

## 🧩 Apps Included

### 📬 MisterEmail (Gmail Clone)
A fully-featured mail client:

- Inbox, Sent, Trash, Drafts
- Compose mail (auto-save to draft every 5 seconds)
- Starred mails ⭐
- Mark as read/unread
- Mail filters: search, status, sort
- Labels: important, romantic, funny 🏷️
- Responsive layout just like Gmail
- Integration with MissKeep – send mail as note

### 🗒️ MissKeep (Google Keep Clone)
A flexible notes manager:

- Create notes: text, image, video, todos, audio, canvas, map
- Edit, delete, duplicate and pin notes
- Change note background color 🎨
- Filter notes by search or type
- Send note content to MisterEmail via queryParams ✉️

---

## 🧠 Technologies Used

- ReactJS
- React Router
- LocalStorage (mock backend)
- Custom Services (mailService, noteService)
- EventBus for cross-app communication
- CSS Modules / Vanilla CSS

---

## 🧱 Folder Structure

```
appsus/
├── apps/
│   ├── mail/      # MisterEmail
│   └── note/      # MissKeep
├── assets/
│   └── css/
├── cmps/          # Shared components (UserMsg, LongTxt, etc.)
├── services/
└── App.jsx
```

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/your-username/appsus
cd appsus
npm install
npm start
```

---

## 👨‍💻 Team Roles

- **Daniel** – Fullstack Development, React Architecture, UI/UX, Feature Logic
- **Teammate (optional)** – Component collaboration and debugging

---

## ✅ Completed Features

- [x] Dynamic mail system with storage
- [x] Keep note types: text, todos, images, audio, video
- [x] Responsive UI on both apps
- [x] Cross-app integration using queryParams
- [x] App shell with navigation and routing
- [x] Demo data built-in

---

## 🚀 Bonus Features (above requirements)

- [x] Gmail-style theme with full CSS grid layout
- [x] Auto-saving drafts
- [x] Full labeling system
- [x] Custom canvas note type
- [x] Map & audio recording integration (optional feature)

---

## 💡 Future Ideas

- Authentication and real mail integration
- Notes sharing and collaboration
- Search highlighting
- Custom color themes

---

🧡 Built with dedication, design, and debugging 🛠️
