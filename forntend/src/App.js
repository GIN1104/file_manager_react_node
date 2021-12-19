import React, { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [ parent, setParent ] = useState('');
  const [ data, setData ]= useState({
    path : "",
    files : []
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
        .then(res => res.json())
        .then(
          (res) => {
            // console.log(res)
            setParent('');
            setData(res);

          },
          (error) => {
            console.log(error)
          }
        )
  
  }, [])
 const clickHandler = event =>{
   event.preventDefault();
   console.log(event.target.attributes.href.value);
   const folderUrl = event.target.attributes.href.value;
       fetch(`http://localhost:8000/?path=${folderUrl}`)
        .then(res => res.json())
        .then(
          (res) => {
            let linkArr = res.path.split('/');
            linkArr.pop();
            setParent(linkArr.join('/'));
            setData(res);

          },
          (error) => {
            console.log(error)
          }
        )
 }

  return (
    <div className="file-manager">
    <div>
        <a href={parent} onClick={clickHandler}>
              <span className="material-icons">arrow_upward</span>
              LEVEL UP
        </a>
    </div>
      <div className="current-level">
        current: { data.path === '' ? '/' : data.path }
      </div>
        <ul className="folder-list">
            {
              data.files.map( (item, key ) => {
                if(item.dir){
                  return <li key={key} className="folder">
                      <a href={data.path + '/' + item.name} onClick={clickHandler}>
                        <span className="material-icons">folder</span>
                           {item.name.toUpperCase()}
                      </a>
                    </li>
                }else{
                  return <li key={key} className="file">
                      <span className="material-icons">text_snippet</span>
                          {item.name}
                  </li>
                }
              })
            }
        </ul>
    </div>
  );
}

export default App;
