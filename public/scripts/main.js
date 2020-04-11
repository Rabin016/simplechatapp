new Vue ({
    el: '#app',
    data: {
        username:null,
        socket: '',
        error: '',
        allow: false,
        msg: null,
        alart: '',
        allMsgBodys: [],
        allTypingName: null
    },
    created(){

        // connecting socket at first
        this.socket = io()
    },
    methods: {
        // sending username to socket server
        userNameEmit() {
            if(this.username == null || ''){
                this.error = 'Please Enter Your Name'
            }else{
                this.socket.emit('join', {
                    username: this.username
                })
                this.error = ''
                this.allow = true
            }
        },
        // Sending single Msg to Socket
        sendmsgEmit(){
            if(this.msg != null || ''){
                this.socket.emit('chat', {
                    msg: this.msg,
                    user: this.username
                })
                this.error = ''             
                this.allow = true              
            }else{
                this.error = 'Please Enter Your Massage'
            }
            this.msg = ''
        },
        typingSend(){
            this.socket.emit('typing', this.username)
        }
    },
    mounted(){
        // Receive New User Joined Brodecast from Socket
        this.socket.on('join', data => {
            this.alart = data.username + ' has joined us'
            setTimeout(()=>{
                this.alart = ''
            }, 7000)
        }),

        // Receive Msg data from Socket
        this.socket.on('chat', data => {
            let newMsg = {
                user: data.user,
                msg: data.msg
            }
            this.allMsgBodys.push(newMsg)
            this.allTypingName=null
            setTimeout(()=>{
                this.alart = ''
            }, 7000)
        }),
        this.socket.on('typing', data => {
            this.allTypingName = data
            setTimeout(()=>{
                this.allTypingName=null
            }, 4000)
        })
    },
})