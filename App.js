import React, {useState, useEffect} from 'react';
import './App.css';
import { uuid } from 'uuidv4'
import Header from "./components/Header"
import AddContact from "./components/AddContact"
import ContactCard from "./components/ContactList"
import ContactList from './components/ContactList';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) =>  {
    // console.log(contact);
    setContacts([...contacts, { id : uuid(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if(retriveContacts) setContacts(retriveContacts);
  // }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactCard contacts={contacts} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
