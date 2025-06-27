import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [linkedinUser, setLinkedinUser] = useState(null);
  const [twitterUser, setTwitterUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/linkedin/me")
      .then((res) => setLinkedinUser(res.data))
      .catch(() => setLinkedinUser(null));

    api
      .get("/auth/twitter/me")
      .then((res) => setTwitterUser(res.data))
      .catch(() => setTwitterUser(null));
  }, []);

  const loginLinkedIn = () =>
    (window.location.href = API_URL + "/auth/linkedin");

  const loginTwitter = () => (window.location.href = API_URL + "/auth/twitter");

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 Start loading

    const fd = new FormData();
    fd.append("text", text);
    if (file) fd.append("media", file);

    const platforms = [];

    if (linkedinUser) {
      try {
        const res = await api.post("/linkedin/post", fd);
        platforms.push(`LinkedIn ✅ (ID: ${res.data.postUrn})`);
      } catch (err) {
        platforms.push(
          `LinkedIn ❌ (${err.response?.data?.error || err.message})`
        );
      }
    }

    if (twitterUser) {
      try {
        const res = await api.post("/twitter/post", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        platforms.push(`Twitter ✅ (ID: ${res.data.tweetId})`);
      } catch (err) {
        platforms.push(
          `Twitter ❌ (${err.response?.data?.error || err.message})`
        );
      }
    }

    setMsg(platforms.join("\n"));
    setText("");
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Social Poster</h1>

      <div className="auth">
        {!linkedinUser ? (
          <button onClick={loginLinkedIn}>Login with LinkedIn</button>
        ) : (
          <p>✅ LinkedIn: {linkedinUser.name}</p>
        )}

        {!twitterUser ? (
          <button onClick={loginTwitter}>
            Login with <strong>X</strong>
          </button>
        ) : (
          <p>✅ Twitter: {twitterUser.username}</p>
        )}
      </div>

      <hr />

      <form onSubmit={handlePost}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What would you like to post?"
          required
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post to Connected Platforms"}
        </button>
      </form>

      {msg && (
        <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{msg}</pre>
      )}
    </div>
  );
}

export default App;
