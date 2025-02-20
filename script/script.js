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
    <main>
      <h3>
        Inscrição confirmada</h3>
        <p>Convide mais pessoas e concorra a prêmios! 
          <br>Compartilhe o link e acompanhe as inscrições:</p>

      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
      </div>
      </main>
      <section class="stats">
        <h4>
          ${totalSubs(userData)}
        </h4>
        <p>Inscrições Feitas</p>
      </section>
  `
  app.setAttribute('class', 'page-invite')
  updateImageLinks()
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
      <main>
        <section class="about">
          <div class="section-header">
            <h2>
              Sobre o evento
            </h2>
            <span class="badge">AO VIVO</span>
            </div>

            <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
              <br> <br>
              Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito </p>
        </section>

        <section class="registration">
          <h2>Inscrição</h2>
          <form id="form" action="#">
            <div class="input-wrapper">

              <div class="input-group">
                <label for="email">
                  <img src="mail.svg" alt="Email">
                </label>
                <input type="email" id="email" name="email" placeholder="E-mail">
              </div>

              <div class="input-group">
                <label for="phone">
                  <img src="phone.svg" alt="Telefone">
                </label>
                <input type="text" id="phone" name="phone" placeholder="Telefone">
              </div>
            </div>

            <button>
              Confirmar
              <img class=trade-hover src="arrow.svg" alt="">
            </button>
          </form>
        </section>
      </main>

  `
  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImageLinks()
  formAction()
}

StartApp()



const logo = document.getElementById("logo");
logo.style.cursor = "pointer";
logo.onclick = () => StartApp();