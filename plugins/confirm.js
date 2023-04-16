$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy();
      },
      footerButtens: [
        {
          text: 'Отменить',
          type: 'secondary',
          handler() {
            modal.close();
            reject();
          },
        },
        {
          text: 'Удалить',
          type: 'danger',
          handler() {
            modal.close();
            resolve();
          },
        },
      ],
    });
    setTimeout(() => {
      modal.open();
    }, 100);
  });
};

// const confirmModal = $.modal({
// 	title: 'Вы уверены?',
// 	closable: true,
// 	width: '400px',
// 	footerButtens: [
// 	  {
// 	    text: 'Отменить',
// 	    type: 'secondary',
// 	    handler() {
// 		 confirmModal.close();
// 	    },
// 	  },
// 	  {
// 	    text: 'Удалить',
// 	    type: 'danger',
// 	    handler() {
// 		 console.log('Danger btn clicked');
// 		 confirmModal.close();
// 	    },
// 	  },
// 	],
//    });
