import { Button } from '@nexdecor/ui';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>NexDecor Platform Core</h1>
      <p>Mimarimiz çalışıyor. İlk komponentimizi test ediyoruz:</p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => console.log('Primary Action')}>
          Primary Buton
        </Button>

        <Button
          variant="secondary"
          onClick={() => console.log('Secondary Action')}
        >
          Secondary Buton
        </Button>
      </div>
    </div>
  );
}
