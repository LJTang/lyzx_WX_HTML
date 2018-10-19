(function() {
  $.fn.weixinAudio = function(options) {
    var $this = $(this);
    var defaultoptions = {
      autoplay:false,
      src:''
    };
    function Plugin($context) {
      this.$context = $context;

      this.$Audio = this.$context.find('#media');
      this.Audio = this.$Audio[0];
      this.$audio_area = this.$context.find('#audio_area');
      this.$audio_length = this.$context.find('#audio_length');
      this.$audio_progress = this.$context.find('#audio_progress');
      //����
      this.currentState = 'pause';
      this.time = null;
      this.settings = $.extend(true, defaultoptions, options);
      this.init();
    }
    Plugin.prototype = {
      init: function() {
        var self = this;
        self.events();
        if(self.settings.src !== ''){
          self.Audio.src = self.settings.src;
        }
        if(self.settings.autoplay){
          self.play();
        }
      },
      play: function() {
        var self = this;
        if (self.currentState === "play") {
          self.pause();
          return;
        }
        self.Audio.play();
        clearInterval(self.timer);
        self.timer = setInterval(self.run.bind(self), 50);
        self.currentState = "play";
        self.$audio_area.addClass('playing');
      },
      pause: function() {
        var self = this;
        self.Audio.pause();
        self.currentState = "pause";
        clearInterval(self.timer);
        self.$audio_area.removeClass('playing');
      },
      stop:function(){

      },
      events: function() {
        var self = this;
        var updateTime;
        self.$audio_area.on('click', function() {
          self.play();
          if (!updateTime) {
            self.updateTotalTime();
            updateTime = true;
          }
        });

        self.$Audio.on('canplay', function () {
          self.updateTotalTime();
        });
      },
      //���ڲ���
      run: function() {
        var self = this;
        self.animateProgressBarPosition();
        if (self.Audio.ended) {
          self.pause();
        }
      },
      //������
      animateProgressBarPosition: function() {
        var self = this,
          percentage = (self.Audio.currentTime * 100 / self.Audio.duration) + '%';
        if (percentage == "NaN%") {
          percentage = 0 + '%';
        }
        var styles = {
          "width": percentage
        };
        self.$audio_progress.css(styles);
      },
      //��ȡʱ����
      getAudioSeconds: function(string) {
        var self = this,
          string = string % 60;
        string = self.addZero(Math.floor(string), 2);
        (string < 60) ? string = string: string = "00";
        return string;
      },
      //��ȡʱ���
      getAudioMinutes: function(string) {
        var self = this,
          string = string / 60;
        string = self.addZero(Math.floor(string), 2);
        (string < 60) ? string = string: string = "00";
        return string;
      },
      //ʱ��+0
      addZero: function(word, howManyZero) {
        var word = String(word);
        while (word.length < howManyZero) word = "0" + word;
        return word;
      },
      //������ʱ��
      updateTotalTime: function() {
        var self = this,
          time = self.Audio.duration,
          minutes = self.getAudioMinutes(time),
          seconds = self.getAudioSeconds(time),
          audioTime = minutes + ":" + seconds;
        self.$audio_length.text(audioTime);
      },
      //�ı���ƵԴ
      changeSrc:function(src){
        var self = this;
        self.pause();
        self.Audio.src = src;
        self.play();
      },
    };
    var obj = {}
    // var instantiate = function() {
    // 	 new Plugin($(this));
    // }
    $this.each(function(index,element){
      obj['weixinAudio'+index] = new Plugin($(this));
    }); //���ִ�з��ض���

    return obj
  }
})(jQuery)