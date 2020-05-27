//Check Login
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = 'block'));
    loggedOutLinks.forEach((link) => (link.style.display = 'none'));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = 'none'));
    loggedOutLinks.forEach((link) => (link.style.display = 'block'));
  }
};
//SignUp
const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.querySelector('#signup-email').value;
    const password=document.querySelector('#signup-password').value;

    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredential=>{
        //clear form
        signupForm.reset();
        //close the modal
        $('#signupModal').modal('hide')
    })
});

//signin
const signinForm=document.querySelector('#login-form');

signinForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.querySelector('#login-email').value;
    const password=document.querySelector('#login-password').value;
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredential=>{
        //clear form
        signupForm.reset();
        //close the modal
        $('#signinModal').modal('hide')
              
    })
    
});

const logout= document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        console.log('sign out');
        
    })
})

//Google Login
 const googleButton=document.querySelector('#googlelogin');
 googleButton.addEventListener('click',(e)=>{
     const provider=new firebase.auth.GoogleAuthProvider();
     auth.signInWithPopup(provider)
     .then((result)=>{
                 //clear form
        signupForm.reset();
        //close the modal
        $('#signinModal').modal('hide')
         console.log('Google signin');
         
     })
     .catch((err)=>{
          console.log(err);
          
     })
 })

 //facebook Login
 const facebookButton=document.querySelector('#facebooklogin');
 facebookButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const provider=new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
     .then((result)=>{
                 //clear form
        signupForm.reset();
        //close the modal
        $('#signinModal').modal('hide')
        console.log(result);
        
         console.log('Facebook signin');
         
     })
     .catch((err)=>{
          console.log(err);
          
     })
    
})
//Posts
const postlist=document.querySelector('.posts');
const setupPosts=data=>{
    if(data.length){
        let html='';
        data.forEach(doc=>{
            //Recupero cada elemento
            const post=doc.data();
            const li=`
               <li class="list-group-item list-group-item-action">
                 <h5>${post.title}</h5>
                 <p>${post.description}</p> 
               </li>
            `;
            html+=li;
        });
      postlist.innerHTML=html;
    }
    else{
        postlist.innerHTML='<p class="text-center"> Login to see Posts</p>';
    }

}

//Events
//List for auth state changes
auth.onAuthStateChanged(user=>{
    if (user) {
        fs.collection('posts')
        .get()
        .then((snapshot)=>{
            
            setupPosts(snapshot.docs)
            loginCheck(user);
        })
        
    } else {
        setupPosts([])
        loginCheck(user);
    }
})
