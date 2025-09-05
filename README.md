# 🚀 CodeQuest

**CodeQuest** is a modern DSA (Data Structures & Algorithms) practice and coding platform inspired by LeetCode.
Solve real problems in a live editor, read detailed explanations, and manage your learning all from one sleek client—built with **Next.js**, **TypeScript**, **Tailwind**, and **CodeMirror**.
*No Firebase used: connect your own backend for storage and code evaluation.*

---

## 🖼️ Screenshots

This includes the screenshots of the prominent pages.

### Faculty Dashboard

<img width="1919" height="940" alt="Image" src="https://github.com/user-attachments/assets/a1637daa-0ad1-4590-8aa8-10e9036fb3a6" />

### Edit Problem Page

<img width="1919" height="940" alt="Image" src="https://github.com/user-attachments/assets/55b26e64-6fac-462f-95f2-3fddf257eaea" />

### Coding IDE (Workspace)

<img width="1919" height="940" alt="Image" src="https://github.com/user-attachments/assets/4dd73fdd-0bd1-475c-8d5b-66cabaa11003" />

### Results Page (Faculty Dashboard)

<img width="1919" height="936" alt="Image" src="https://github.com/user-attachments/assets/06138271-fb07-4ac9-84f5-ea664fc8029d" />

<img width="1494" height="601" alt="Image" src="https://github.com/user-attachments/assets/c60a8355-562b-414b-b812-85e6faf032df" />

---

## 🎥 Demo Video  

[![Watch the Demo](https://img.shields.io/badge/▶️%20Watch%20Demo-blue?style=for-the-badge)](https://drive.google.com/file/d/1yXOdVXWnT6HYek9FWMi9MuKE-CFaG-CG/view?t=3)

---

## 📦 Features

* Live coding playground with **CodeMirror** (supports C++, Python, JavaScript)
* Rich problem descriptions with sample cases
* Responsive UI built with **Tailwind CSS**
* Intuitive navigation: Navbar, Topbar, Workspace, Problems Table, Modals, etc.
* Modular, extensible React component structure
* Authentication UI (no backend wired—bring your own API)
* Admin dashboard for adding/editing problems
* Variety of DSA problem utilities (Two Sum, Subset Sum, Reverse Linked List, and more)
* State managed by **Recoil**

---

## 🛠 Stack

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [CodeMirror 6](https://codemirror.net/) code editor
* [Recoil](https://recoiljs.org/) for state management
* [Axios](https://axios-http.com/)
* UI: React Icons, Lucide, Toastify, Confetti animations

---


```
├── public/
│   └── screenshots/            # Place image assets here
├── src/
│   ├── atoms/                  # Recoil atoms for global state
│   ├── components/             # Reusable UI + feature components
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Next.js pages (routing)
│   ├── utils/                  # Problem definitions & helper functions
│   └── styles/                 # Global CSS & Tailwind setup
├── .env.sample                 # Example environment variables
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # TailwindCSS config
└── tsconfig.json               # TypeScript config
```

---

## ⚙️ Getting Started

### 1. Clone & Install

```
git clone https://github.com/your-username/codequest.git
cd codequest
npm install
```

### 2. Build & Deploy

```
npm run build
npm start
```

---

## 💡 Usage

* Browse and attempt coding problems via the Problems Table or Workspace.
* Use the Editor to write and test code.
* *Authentication modals are UI-only—hook up your backend/login system as needed.*
* For code execution/evaluation: integrate your own backend API.

---

## ✨ Roadmap

* [ ] Backend code evaluation and submissions
* [ ] User accounts, profile, and submission tracking
* [ ] Sorting/filters: tags, difficulty, topic
* [ ] Discussions for each problem
* [ ] Leaderboard/contest mode

---

## 🤝 Contributing

Pull requests are welcome! Fork, commit, and open a PR.

---

*Built with ❤️ by \[Vansh Verma].*

---

<!-- 🔗 Image References (replace these URLs) -->

[faculty-dashboard-img]: https://your-cdn.com/screenshots/faculty-dashboard.png
[edit-problem-img]: https://your-cdn.com/screenshots/edit-problem.png
[coding-ide-img]: https://your-cdn.com/screenshots/coding-ide.png
[results-page-img]: https://your-cdn.com/screenshots/results-page.png
