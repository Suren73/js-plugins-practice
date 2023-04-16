let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 28,
    img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 28,
    img: 'https://e0.edimdoma.ru/data/ingredients/0000/8813/8813-ed4_wide.jpg?1482763602',
  },
  {
    id: 3,
    title: 'Груши',
    price: 28,
    img: 'https://e0.edimdoma.ru/data/ingredients/0000/1891/1891-ed4_wide.jpg?1482767041',
  },
];

const toHtml = (fruit) => `
<div class="col">
          <div class="card">
            <img
              src= "${fruit.img}"
              class="card-img-top"
              style="max-width: 400px"
              alt="${fruit.title}"
            />
            <div class="card-body">
              <h5 class="card-title">${fruit.title}</h5>
              <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
              <a href="#" class="btn btn-danger" data-btn ="remove" data-id="${fruit.id}">Удалить</a>
            </div>
          </div>
        </div>
`;

/*
* 1. Динамически на основе массива вывести список карточек +
* 2. Показать цену в модалке (и это должна быть одна модалка) +
* 3. Модалка для удаления с 2-мя кнопками
--------------------
* 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise)
*/

function rendor() {
  const html = fruits.map(toHtml).join('');

  document.querySelector('#fruits').innerHTML = html;
}

rendor();
const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtens: [
    {
      text: 'Закрыть',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked');
        priceModal.close();
      },
    },
  ],
});

// myModal.open();
// modal.open();

document.addEventListener('click', (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((el) => el.id === id);
  if (btnType === 'price') {
    priceModal.setContent(`
    <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `);
    priceModal.open();
    console.log(id, fruit);
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете фрукт <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((el) => el.id !== id);
        rendor();
        //    console.log(fruits);
      })
      .catch(() => {
        console.log('Cansel');
      });
  }
});
