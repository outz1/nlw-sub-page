const app = document.getElementById("app") //Main Div
const users = [ //Usuários teste
  {
    email: 'test@test.com',
    phone: '99999999999',
    ref: 100,
    refBy: null
  },
  {
    email:'tust@tust.com',
    phone:'99999999999',
    ref: 200,
    refBy: 100
  },
  {
    email:'tost@tost.com',
    phone:'99999999999',
    ref: 300,
    refBy: 200
  }

]


const getUser = (userData) => { //Verifica se o usuário foi cadastrado
  return users.find((user) => {
    return user.email == userData.email
  })
}

const totalSubs = (userData) => { //Usuários que foram referenciados
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `
    <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    <div id="stats">
      <h4>
      ${totalSubs(userData)}
      </h4>
      <p>Inscrições Feitas</p>
    </div>
  `
}

const saveUser = (userData) => { //Criação de usuário
  const newUser = {
    ...userData, //Capta todas as informações do userData
    ref: Math.round(Math.random() * 4000),//Arredonda
    refBy: 100
  }

  users.push(newUser)
  console.log(users)
  return newUser
}

const formAction = () => { //Usuário no forms -> direcionamento de página
  const form = document.getElementById('form')
  form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone'),
    }
    
    const user = getUser(userData)
    if(user) { //usuário encontrado no db (True Boolean)
      showInvite(user)
    } else { //usuário não encontrado no db
      const newUser = saveUser(userData)
      showInvite(newUser)
    }

  }
}

const updateImageLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute("src"); 
    if (src && !src.startsWith("http")) {  
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  });
};


const StartApp = () => { //Main Page
  const content = `
  <form id="form">
    <input type="email" name="email" placeholder="E-mail">
    <input type="text" name="phone" placeholder="Telefone">
    <button type="submit">Confirmar</button>
  </form>
  `
  app.innerHTML = content
  formAction()
}

StartApp()

document.getElementById("logo").onclick = () => StartApp()