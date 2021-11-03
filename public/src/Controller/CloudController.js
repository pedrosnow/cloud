class CloudController {

    constructor(){

        this.btnUpload = document.getElementById('btn-upload')
        this.inputFile = document.getElementById('input-file')
        this.uploadModal = document.getElementById('Upload')
        this.progressBar = document.getElementById('progress-bar')
        this.nameFile = document.getElementById('name-file')
        this.tempoFile = document.getElementById('tempo-file')

        this.initEvent()
        
    }

    initEvent(){
        
        this.btnUpload.addEventListener('click', event => {
            
            this.inputFile.click()

        })


        this.inputFile.addEventListener('change', event => {

            this.uploadModal.style.display = 'block'

            this.uploadTask(event.target.files)

            this.inputFile.value = '';

        })

    }

    uploadTask(files){

        let promeses = [];

        [...files].forEach(element => {
            
            promeses.push(new Promise((resolve, reject) =>{

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload')

                ajax.onload = event => {

                    try {
                        // Ver sobre json parser
                        resolve(JSON.parse(ajax.responseText))

                    } catch (error) {

                         
                        reject(error)
                    }

                }
                ajax.onerror = event => {

                    reject(event)
                }

                ajax.upload.onprogress = event => {


                    this.UploadProgress(event, element)


                }

                let formData = new FormData()

                // Captuar a hora que ele começou o upload

                this.starUploadTime = Date.now();

                formData.append('input-file', element)

                ajax.send(formData);


            }))


        });

        return  Promise.all(promeses)

    }
    UploadProgress(event, element){

        let timeSpent = Date.now() - this.starUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 100);
        let fimeleft = ((100 - porcent) * timeSpent) / porcent;

        this.progressBar.style.width = porcent + '%';

        this.nameFile.innerHTML = element.name
        this.tempoFile.innerHTML = this.formatTimeToHuman(fimeleft)


        if(porcent == '100'){
            this.uploadModal.style.display = 'none'
        }


    }

    formatTimeToHuman(durations){

        let seconds = parseInt((durations / 1000) % 60);
        let minutes = parseInt((durations / (1000 * 60 )) % 60);
        let hours = parseInt((durations / (1000 * 60 * 60 )) % 24);

        if(hours > 0){
            return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;
        }
        
        if(minutes > 0){
            return `${minutes} minutos, ${seconds} segundos`;
        }
        
        if(seconds > 0){
            return ` ${seconds} segundos`;
        }

        return ``;
       

    }

    getFileIcons(file){

        switch (file.type) {
            case 'musica' :
                return `<img src="assets/img/icon-musical2.png">`;
                break;
        
            default:
                break;
        }

    }

    getFileView(file){

        return ` <div class="magin-conteiner-photo ">
                <div class="conteiner-icon-photo">
                    <input type="radio" name="" id="">
                    <div class="fa fa-ellipsis-h options">
                        <div class="optins-link-photo word">
                            <a href="">Editar</a>
                            <a href="">Excluir</a>
                            <a href="">Arquivar</a>
                            <a href="">Renomear</a>
                        </div>
                    </div>
                </div>
                <a href="" class="file">
                    ${this.getFileIcons(file)}
                    <span class="legenda">${file.name}</span>
                </a>
            </div>`
    }

}