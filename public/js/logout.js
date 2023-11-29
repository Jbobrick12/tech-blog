const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const createPostBtn = document.getElementById("createPostBtn");

const logout = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out");
  }
};

const login = async (event) => {
  event.preventDefault();
  document.location.replace("/login");
};

const createPost = async (event) => {
  event.preventDefault();
  document.location.replace("/api/posts");
};

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

if (signupBtn) {
  signupBtn.addEventListener("click", login);
}

if (createPostBtn) {
  createPostBtn.addEventListener("click", createPost);
}
