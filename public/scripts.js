document.querySelector('.left-arrow').addEventListener('click', function() {
    document.querySelector('.animal-container').scrollBy({
      left: -220, // Adjust the scroll amount as needed
      behavior: 'smooth'
    });
  });

  document.querySelector('.right-arrow').addEventListener('click', function() {
    document.querySelector('.animal-container').scrollBy({
      left: 220, // Adjust the scroll amount as needed
      behavior: 'smooth'
    });
  });


  // fprm 

  // const signInButton = document.getElementById('signInButton');
  //   const signInForm = document.getElementById('signInForm');
  //   const signUpForm = document.getElementById('signUpForm');
  //   const backdrop = document.getElementById('backdrop');
  //   const toggleToSignUp = document.getElementById('toggleToSignUp');
  //   const toggleToSignIn = document.getElementById('toggleToSignIn');

  //   signInButton.addEventListener('click', () => {
  //       signInForm.classList.add('active');
  //       backdrop.classList.add('active');
  //   });

  //   toggleToSignUp.addEventListener('click', () => {
  //       signInForm.classList.remove('active');
  //       signUpForm.classList.add('active');
  //   });

  //   toggleToSignIn.addEventListener('click', () => {
  //       signUpForm.classList.remove('active');
  //       signInForm.classList.add('active');
  //   });

  //   backdrop.addEventListener('click', () => {
  //       signInForm.classList.remove('active');
  //       signUpForm.classList.remove('active');
  //       backdrop.classList.remove('active');
  //   });

    // form 3

  
    document.getElementById('show-signup').addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'block';
  });

  document.getElementById('show-login').addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
  });