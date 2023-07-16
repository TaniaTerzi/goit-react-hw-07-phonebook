import ContactElement from "components/ContactElement/ContactElement";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "redux/operations";
import css from './contactList.module.css'


function ContactList() {
  const filter = useSelector(state => state.filter.query);
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function filterContacts() {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  function handleDelete(id) {
    dispatch(deleteContact({ id: id }));
  }

  return (
    <div className={css.conteiner}>
    {contacts.length > 0
      ? (
       
          <ul className={css.contactList}>
            {filterContacts().map(({ id, name, number }) => {
              return (
                <li className={css.contactList} key={id}>
                  <ContactElement
                    id={id}
                    name={name}
                    number={number}
                    onDelete={handleDelete}
                  />
                </li>
              );  
            })}
          </ul>
   
        )
        :
        (<p >There are no contacts.</p>)    
      }
      </div>
  )
}

export default ContactList;