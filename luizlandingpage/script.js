const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 10;
  const y = (e.clientY / window.innerHeight) * 10;
  hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});

// Contadores animados ao scroll
const counters = document.querySelectorAll('.card h4');
let started = false;

function startCounters() {
  if (started) return;
  const metricsSection = document.querySelector('.bg-light.text-center');
  const position = metricsSection.getBoundingClientRect().top;

  if (position < window.innerHeight - 100) {
    counters.forEach(counter => {
      const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
      counter.innerText = '0';

      const update = () => {
        const current = parseInt(counter.innerText);
        const increment = Math.ceil(target / 100);
        if (current < target) {
          counter.innerText = current + increment;
          requestAnimationFrame(update);
        } else {
          counter.innerText = counter.parentElement.querySelector('p').innerText.includes('%') ? target + '%' : target + '+';
        }
      };
      update();
    });
    started = true;
  }
}
window.addEventListener('scroll', startCounters);


 // Abrir formulário flutuante
const openBtn = document.getElementById('openForm');
const floatingForm = document.getElementById('floatingForm');
const closeBtn = document.getElementById('closeForm');
const heroHiden = document.getElementById('heroHiden');

// Abrir com fade-in
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  floatingForm.classList.add('show');
  heroHiden.classList.add('hidden');
});

// Fechar com fade-out
closeBtn.addEventListener('click', () => {
  floatingForm.classList.remove('show');
  heroHiden.classList.remove('hidden');
});

// Fechar ao clicar fora do formulário
floatingForm.addEventListener('click', (e) => {
  if (e.target === floatingForm) {
    floatingForm.classList.remove('show');
    heroHiden.classList.remove('hidden');
  }
});

// Enviar dados para WhatsApp
const form = document.getElementById('leadForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const mensagem = document.getElementById('mensagem').value;

  const numeroWhatsApp = '558191923121'; // altere aqui
  let texto = `Olá, gostaria de mais informações.%0A%0A` +
              `*Nome:* ${nome}%0A` +
              `*E-mail:* ${email}%0A` +
              `*Telefone:* ${telefone}%0A` +
              `*Mensagem:* ${mensagem || 'Não informado'}%0A`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
  window.open(url, '_blank');

  floatingForm.style.display = 'none';
});

