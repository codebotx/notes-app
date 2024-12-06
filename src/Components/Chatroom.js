import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import '../assets/css/chatApp.css';
import firebase from 'firebase/compat/app';
import { Form } from 'react-bootstrap';
import 'firebase/compat/firestore';
import 'firebase/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import community from '../assets/img/team.svg';
import { Send } from 'react-bootstrap-icons';

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
  useEffect(() => {
    document.title = 'Community | RESOC';
    return () => {
      document.title = 'NOTES-SIT | RESOC';
    };
  }, []);

  const [isDark, setIsDark] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const [limit, setLimit] = useState(10);
  const handleLoadMore = useCallback(() => {
    setLimit((prev) => prev + 25);
  }, []);

  return (
    <>
      <section className="py-4 px-4 px-sm-1 cdin">
        <div className="d-sm-flex align-items-center justify-content-between mainc">
          <div className="img-home">
            <h1 className="heading">SOC<span className="text-secondary">HOME</span></h1>
            <p className="lead my-4">
              Connect and engage with like-minded folk, and give us a holler!
            </p>
          </div>
          <img className="img-fluid w-50 d-none d-sm-block p-5" src={community} style={{ marginBlockEnd: "20px" }} alt="in office" />
        </div>
      </section>

      <div className='p-2 p-sm-5'>
        <button className="btn" style={{ color: '#ff5e5b' }} onClick={() => auth.signOut()}>SIGN OUT</button>
        <div className="py-2 d-flex align-items-center justify-content-start mb-2">
          <button className={`btn ${isDark ? 'btn-dark' : 'btn-light'}`} onClick={handleLoadMore}>Load More</button>
        </div>
        <ChatRoom dark={isDark} limit={limit} />
      </div>
    </>
  );
}

const ChatRoom = memo(({ dark, limit }) => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages-production');
  const query = messagesRef.orderBy('createdAt').limitToLast(limit);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName);

  useEffect(() => {
    if (displayName && displayName.includes(" ")) setDisplayName(displayName.slice(0, displayName.indexOf(" ")));
    else if (!displayName) setDisplayName(auth.currentUser.email.slice(0, auth.currentUser.email.indexOf("@")));

    if (!auth.currentUser.photoURL) auth.currentUser.updateProfile({ photoURL: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${displayName}&radius=50` });
  }, [displayName]);

  const sendMessage = useCallback(async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      id: uid + Date.now() + Math.random(),
      displayName
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesRef, formValue, displayName]);

  return (
    <main className='main p-2 p-sm-4'>
      {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      <span ref={dummy}></span>

      <div className='d-flex justify-content-between'>
        <Form className='form mx-4 my-3' onSubmit={sendMessage}>
          <input className='form-control form-control-sm' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Start typing " />
          <button type="btn submit" disabled={!formValue} className="btn mx-1" style={{ background: "none", outline: "none", color: dark ? "white" : "black" }}><Send /></button>
        </Form>
      </div>
    </main>
  );
});

const ChatMessage = memo(({ message }) => {
  const { text, uid, photoURL, displayName } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass} px-sm-2`}>
      <div className='message-content'>
        <img className='profphoto' src={photoURL} alt='' />
        <div className='message-bubble'>
          <span className='name fw-bold'>{displayName}</span>
          <p className='para'>
            {text.includes("https://") || text.includes("http://") ? (
              <span>
                {text.split(" ").map((word) => (
                  word.includes("https://") || word.includes("http://") ? (
                    <a key={word} className="text-var" href={word} target="_blank" rel='noreferrer'>{word} </a>
                  ) : `${word} `
                ))}
              </span>
            ) : text}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Chat;