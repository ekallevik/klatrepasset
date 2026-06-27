import { type Component } from "solid-js";

export const AboutView: Component = () => (
  <div>
    <header class="mb-4">
      <h2 class="text-2xl font-bold m-0">Om Klatrepasset</h2>
    </header>

    <section class="bg-white border border-line rounded-2xl p-6 shadow-sm leading-relaxed">
      <p class="mt-0">
        <strong>Klatrepasset</strong> er Kolsås Klatreklubbs svar på Tur-orientering: kjøp passet for
        sesongen, få en kuratert samling klatrefelt og ruter rundt Oslo, og samle dem i ditt eget tempo.
      </p>

      <h3 class="text-lg font-bold mt-6 mb-2">Slik sjekker du inn (ingen GPS)</h3>
      <ul class="m-0 pl-5">
        <li>
          <strong>Kodebasert:</strong> en liten plate med en 2–4-bokstavs kode står ved/på toppen av ruten.
          Du taster koden i appen — samme prinsipp som postkoden i Tur-orientering.
        </li>
        <li>
          <strong>Tillitsbasert:</strong> for felt uten skilt registrerer du ruten på ære og tro.
        </li>
      </ul>

      <h3 class="text-lg font-bold mt-6 mb-2">Tre spor i samme pass</h3>
      <ul class="m-0 pl-5">
        <li>
          <strong class="text-track-green">🟢 Grønt</strong> — familie & nybegynner: lav buldring, topptau, grad 2–5.
        </li>
        <li>
          <strong class="text-track-blue">🔵 Blått</strong> — allround: sport og buldring, grad 5–6.
        </li>
        <li>
          <strong>⚫ Svart</strong> — erfaren: flertaulengder, trad og signaturruter, grad 6+.
        </li>
      </ul>

      <h3 class="text-lg font-bold mt-6 mb-2">Hvorfor det er bra for klubben</h3>
      <ul class="m-0 pl-5">
        <li>
          <strong>Inntekt:</strong> passalg, trykt feltguide, sponsorer og intro-eventer.
        </li>
        <li>
          <strong>Medlemsvekst:</strong> medlemmer får passet billigere — en konkret grunn til å melde seg inn.
        </li>
        <li>
          <strong>Mer klatring:</strong> lav terskel, gamification og utforsking av nærområdet.
        </li>
      </ul>

      <p class="text-sm text-muted mb-0 mt-6">
        Se <code>CONCEPT.md</code> i repoet for hele konseptskissen.
      </p>
    </section>
  </div>
);
