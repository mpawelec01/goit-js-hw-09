const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const handleSubmit = event => {
  event.preventDefault();
  const firstDelay = Number.parseInt(event.target.elements['delay'].value);
  const delayStep = Number.parseInt(event.target.elements['step'].value);
  const amount = Number.parseInt(event.target.elements['amount'].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, firstDelay + delayStep * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};
form.addEventListener('submit', handleSubmit);
