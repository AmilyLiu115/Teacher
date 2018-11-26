let login = new Vue({
	el: '#login',
	data: {
		doneType: 0, // 0表示登录  1表示注册 2表示忘记密码
		loginPhone: '',
		loginPassword: '',
		registerPhone: '',
		registerCode: '',
		registerPassword: '',
		registerPassWordConfirm: '',
		registerEmail: '',
		registerName: '',
		registerNickName: '',
		forgetPhone: '',
		forgetCode: '',
		forgetPassword: '',
		forgetPasswordConfirm: '',
		phoneOk: false, //手机号验证状态
		passwordOk: false, // 密码验证状态
		confirmPasswordOk: false, // 确认密码状态
		codeOk: false, // 验证码状态
		emailOk: false, // 邮箱状态
		nameOk: false, // 姓名状态
		nickNameOk: false, // 昵称状态
		PhoneReg: new RegExp('^1\\d{10}$', 'i'),
		showWarnInfo: false,
		warnInfo: '',
		sendCode: '发送验证码',
		disabledSend: false
	},
	computed: {
		canLogin() {
			return this.phoneOk && this.passwordOk
		},
		canRegister() {
			return this.phoneOk && this.codeOk && this.passwordOk && this.confirmPasswordOk && this.emailOk && this.nameOk && this.nickNameOk
		},
		canSubmit() {
			return this.phoneOk && this.codeOk && this.passwordOk && this.confirmPasswordOk
		}
	},
	methods: {
		timeCutDone() {
			// 倒计时
			if(this.disabledSend) {
				return
			}

			this.disabledSend = true;
			let count = 20,
				timmer = null,
				self = this;
			self.sendCode = '20s后重发'
			timmer = setInterval(() => {
				if(count == 1) {
					self.sendCode = '发送验证码';
					self.disabledSend = false
					clearInterval(timmer)
					return
				}
				count--
				self.sendCode = count + 's后重发'
			},1000)
		},
		changeDoneType(val) {
			this.doneType = val
		},
		phoneCheck() {
			switch (this.doneType) {
				// 登录状态的手机号码验证
				case 0:
					this.phoneCheckStatus(this.loginPhone)
					break;
				// 注册状态的手机号码验证
				case 1:
					this.phoneCheckStatus(this.registerPhone)
					break;
				// 忘记密码状态的手机号码验证
				case 2:
					this.phoneCheckStatus(this.forgetPhone)
					break;
			}
		},
		phoneCheckStatus(phoneType) {
			if (phoneType == '') {
				this.showWarn('请输入手机号!');
				this.phoneOk = false
			} else if (!this.PhoneReg.test(phoneType)) {
				this.showWarn('手机号输入有误，请重新输入！');
				this.phoneOk = false
			} else {
				this.phoneOk = true
			}
		},
		passwordCheck(val) {
			// 密码校验
			// 非空校验
			switch (val) {
				case 'register':
					this.passwordCheckStatus(this.registerPassword, this.registerPassWordConfirm)
					break;
				case 'forget' :
					this.passwordCheckStatus(this.forgetPassword, this.forgetPasswordConfirm)
					break;
			}

		},
		passwordCheckStatus(password, confirmPassword) {
			if (password == '') {
				this.showWarn('请输入密码!');
				this.passwordOk = false;
			}

			if (password != '') {
				this.passwordOk = true;
			}
			// 密码一致性校验
			if (confirmPassword != '' && password != confirmPassword) {
				this.showWarn('两次密码输入不一致，请重新输入！');
				this.confirmPasswordOk = false;
				return
			} else {
				if (confirmPassword == '') {
					this.confirmPasswordOk = false;
				} else {
					this.confirmPasswordOk = true;
				}
			}
		},
		passwordConfirm(val) {
			// 密码一致性校验
			switch (val) {
				case 'register':
					this.passwordConfirmStatus(this.registerPassword, this.registerPassWordConfirm)
					break;
				case 'forget':
					this.passwordConfirmStatus(this.forgetPassword, this.forgetPasswordConfirm)
					break
			}
		},
		passwordConfirmStatus(password,confirmPassword) {
			if (confirmPassword == '') {
				this.showWarn('请输入确认密码!');
				this.confirmPasswordOk = false;
				return
			} else if (password != confirmPassword) {
				this.showWarn('两次密码输入不一致，请重新输入！');
				this.confirmPasswordOk = false;
				return
			} else {
				this.confirmPasswordOk = true;
			}
		},
		emailCheck() {
			// 邮箱校验
			let myReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

			if (this.registerEmail == '') {
				this.showWarn('请输入邮箱!');
				this.emailOk = false
			} else if (!myReg.test(this.registerEmail)) {
				this.showWarn('请输入正确的邮箱!');
				this.emailOk = false
			} else {
				this.emailOk = true
			}
		},
		checkEmpty(val) {
			// 仅做非空校验
			switch (val) {
				case 'loginPassword':
					this.checkEmptyStatus(this.loginPassword,this.passwordOk, '请输入密码！')
					break;
				case 'registerCode':
					this.checkEmptyStatus(this.registerCode,this.codeOk, '请输入验证码！')
					break;
				case 'registerName' :
					this.checkEmptyStatus(this.registerName,this.nameOk, '请输入您的真实姓名！')
					break;
				case 'registerNickName' :
					this.checkEmptyStatus(this.registerNickName,this.nickNameOk, '请输入您的昵称！')
					break;
				case 'forgetCode' :
					this.checkEmptyStatus(this.forgetCode,this.codeOk, '请输入验证码！')
					break;
			}
		},
		checkEmptyStatus(checkItem,status,msg) {
			if (checkItem == '') {
				this.showWarn(msg);
				status = false
			} else {
				status = true
			}
		},
		showWarn(val) {
			let self = this;

			self.showWarnInfo = true;
			self.warnInfo = val;

			setTimeout(() => {
				self.showWarnInfo = false;
				self.warnInfo = '';
			}, 3000)
		},
		loginSubmit() {
			// 登录

			if (!this.canLogin) {
				this.showWarn('请先填写信息！')
				return
			}

			//登录
			alert('登录')
		},
		registerSubmit() {

			if (!this.canRegister) {
				this.showWarn('请先填写信息！')
				return
			}

			// 注册
			alert('注册')
		},
		forgetSubmit() {
			if (!this.canSubmit) {
				this.showWarn('请先填写信息！')
				return
			}

			// 注册
			alert('忘记密码')
		}
	}
})