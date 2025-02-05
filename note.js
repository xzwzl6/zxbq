var vm = new Vue({
	el: '#myNote',
	data: {
		message: '这是一个在线便签',
		tips: '不可储存重要信息避免丢失',
		noteList: [],
		isShow: false,
		isRotate: false,
		// 便签内容
		noteTitle: '',
		noteContent: '',
		noteColor: '',
		noteBgColor: ''
	},
	//初始化
	mounted: function(){
		this.$nextTick(function(){
			// this.message = 'vueJs';
			//展示便签列表
			this.showList();
		})
	},
	filters: {
		//格式化时间
		timeFormat: function(value){
			let d = new Date(value),
				yyyy = d.getFullYear(),
				MM = d.getMonth() + 1,
				dd = d.getDate(),
				hh = d.getHours(),
				mm = d.getMinutes(),
				ss = d.getSeconds();
			MM = vm.addZero(MM);
			dd = vm.addZero(dd);
			mm = vm.addZero(mm);
			ss = vm.addZero(ss);
			return (yyyy + '年' + MM + '月' + dd + '日 ' + hh + ':' + mm + ':' + ss);
		}
	},
	//一些方法
	methods: {
		//展示便签列表
		showList: function(){
			//如果本地有数据就读取本地，反则创建新的。
			let note = localStorage.getItem("localNote");
			if (note) {
				this.noteList = JSON.parse(note);
			}else{
				this.noteList = [{
								title: "第一天",
								content: "请随意编辑笔记内容",
								timeStamp: +new Date(),
								color: "#000",
								background: "#cdfbcd"
							}];
			};
			// var that = this;
			// this.$http.get("json/note.json",{"id": 123}).then(function(res){
			// 	console.log(res);
			// 	that.noteList = res`;
			// })
		},
		editTitle: function(){},
		addZero: function(e){
			return e = (e < 10 ? '0' + e : e);
		},
		//弹出便签
		showNote: function(){
			this.isShow = !this.isShow;
			this.isRotate = !this.isRotate;
		},
		//改变便签的背景色
		changeColor: function(event){
			if (event.target.tagName == "SPAN") {
				let bgColor = event.target.attributes[0].value;
				this.noteColor = bgColor;
			};
		},
		//改变便签的背景色
		changeBgColor: function(event){
			if (event.target.tagName == "SPAN") {
				let bgColor = event.target.attributes[0].value;
				this.noteBgColor = bgColor;
			};
		},
		//创建便签
		createNote: function(){
			let now = + new Date();
			//创建便签
			this.noteList.push({
				title: this.noteTitle,
				content: this.noteContent,
				timeStamp: now,
				color: this.noteColor,
				background: this.noteBgColor
			});
			//清空，关闭创建便签的模板
			this.noteTitle = '';
			this.noteContent = '';
			this.noteColor = '';
			this.noteBgColor = '';
			this.isShow = !this.isShow;
			this.isRotate = !this.isRotate;
			//保存本地
			this.saveLocal();
		},
		//delete note
		deleteNote: function(item){
			let index = this.noteList.indexOf(item);
			this.noteList.splice(index,1);
			//保存本地
			this.saveLocal();
		},
		saveLocal: function(){
			//保存数据到本地
			let localNote = JSON.stringify(this.noteList);
			localStorage.setItem("localNote",localNote);
		},
		saveNote: function(item,event){
			let index = this.noteList.indexOf(item);
			//获取标题和内容,文字以及背景色
			let tit = event.target.attributes[0].value,
			    con = event.target.attributes[1].value,
			    color = event.target.attributes[2].value,
			    bgcolor = event.target.attributes[3].value;
			let obj = this.noteList[index];
			obj.title = tit;
			obj.content = con;
			obj.timeStamp = +new Date();
			obj.color = color;
			obj.background = bgcolor;
			//保存本地
			this.saveLocal();
		}
	}
});