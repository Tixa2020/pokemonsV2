var api = "https://pokeapi.co/api/v2/pokemon/";
        var api2 = "https://pokeapi.co/api/v2/characteristic/";
      let name;

     var img;
     var returnNameStorage; //Trabalha na funçao de retorna o nome que está no local storage;
     var travaContraRepetiçaoPok; //Impede que o pokemon se repita na lista;
        
        
        const id = document.querySelector('#searchBar')
        const butao = document.querySelector('#btn1');
        const description = document.querySelector('#description');
        const form = document.querySelector('#adicionar');

        const areaImgsLocalStorage = document.querySelector('#areaImgsLocalStorage');
        const clear = document.querySelector('#clear');

        const divP = document.querySelector('#divP');
        const p = document.querySelector('#pInf');
   
       

        let imgs = JSON.parse(localStorage.getItem('imgs')) || []; //define  as imagem do pokemon do local Storage
        let nameStorage = JSON.parse(localStorage.getItem('nameStorage')) || []; //define os nome do pokemon referente a list


       

        for (let x = 0; x < imgs.length; x++) { //Cria e preenche as divS com a imagem e o nome.
          boxImg(imgs[x], x);
        }
        



        function loadpk() {
        
          fetch(`${api}${id.value}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
            name = data['name'][0].toUpperCase() + data['name'].slice(1);
              document.getElementById("nome").innerHTML = name;
        
              document.getElementById("numero").innerHTML = "#" + data['id'];
              
               img = data.sprites.front_default;
              
        
              document.querySelector('#img').style.opacity = 0;
              setTimeout(function() {
                document.querySelector('#img').setAttribute('src', img);
                document.querySelector('#img').style.opacity = 1;
              }, 300);
        
            })
            .catch((erro) => {
              console.log("erro: " + erro)
            })
        
          fetch(`${api2}${id.value}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              description.innerHTML = data['descriptions'][2].description;
            })
            .catch((erro) => {
              console.log("erro: " + erro)
            })
        
        }
        
        
        
        loadpk()
        
        butao.addEventListener('click', function changeID() {
          idpoke = Number(id.value);
        
          if (idpoke < 1) {
            idpoke = 1
            id.value = 1
          }
          if (idpoke > 807) {
            idpoke = 807;
            id.value = 807
          }
                   
          pokeApi = `https://pokeapi.co/api/v2/pokemon/${id.value}`;
          loadpk()
        })
      function BuscarMeuDado(id)  {
      
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id.value}`)
        
      .then(function(id){
        console.log(BuscarMeuDado.data);
        id.innerHTML = BuscsrMeuDado.data.id
      }
      
     ) }
     form.addEventListener('submit', function (evt){
       evt.preventDefault();
       console.log(id.value)
       BuscarMeuDado(id.value);
       imgLocalStorage();//Adiciona as imagems ao local storage.
     })


     function boxImg(img, posiçãoNoStorage) { //Cria as divS e os src para receber as imagens e os nomes referentes

       const div = document.createElement('div');
       div.style.display = "flex";
       div.style.flexDirection = "column";
       div.style.justifyContent = "center";
       div.style.alignItems = "center";
       div.style.border = "2px solid #9088a3"
       div.style.borderRadius = "5px"
       div.style.marginLeft = "3px"
       areaImgsLocalStorage.appendChild(div);

       const h1Name = document.createElement('h1');
       h1Name.textContent = nameStorage[posiçãoNoStorage];
       div.appendChild(h1Name);

       const elementImg = document.createElement('img');
       elementImg.setAttribute('src', img);
       div.appendChild(elementImg);
          
     }

     function imgLocalStorage() { // quarda as imgs e seus nomes referentes no local storage e lança a funçao boxImg
       if(travaContraRepetiçaoPok != img) {
         if(imgs.length < 6) {
         
           imgs.push(img);
           nameStorage.push(name);
           travaContraRepetiçaoPok = img;
           localStorage.setItem('imgs', JSON.stringify(imgs));
           localStorage.setItem('nameStorage', JSON.stringify(nameStorage));
           localStorage.setItem('travaContraRepetiçaoPok', JSON.stringify(travaContraRepetiçaoPok));

           for (let x = 0; x < imgs.length; x++) {
             if(x == imgs.length-1)
               returnNameStorage = x;
            }
      

       boxImg(img, returnNameStorage);

       }else {
          alert("Sua lista está cheia!");
       }

       }else {

         alert("Você já adicionou esse pokemon");

      }

     }

     clear.onclick = () => { //Limpa a lista
       if(imgs.length > 0){

         divP.style.display = "block"
         localStorage.removeItem('imgs');
         localStorage.removeItem('nameStorage');
         localStorage.removeItem('travaContraRepetiçaoPok');
         form.style.display = "none";
         clear.style.display = "none";

        }else{

           alert("Sua lista está vazia")
       }

     }