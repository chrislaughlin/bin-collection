import { getBinInformation } from '@/lib/bin';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const binInfo = await getBinInformation();
  const isSuccess = binInfo.status === 'success';
  const message = isSuccess
    ? `${binInfo.binType}!`
    : binInfo.message;
  const messageClassName = `bin-message${isSuccess ? ' bin-message--pop' : ''}`;

  return (
    <>
      <div className="sky" aria-hidden="true">
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="cloud cloud-three" />
      </div>

      <main className="stage">
        <section className="card" aria-live="polite">
          <header className="card__header">
            <span className="card__badge">Belfast BT7 2HR</span>
            <h1 className="card__title">Meet Your Next Bin Buddy!</h1>
            <p className="card__subtitle">
              We took a cheeky peek at Belfast City Council and found which bin is rolling out
              next.
            </p>
          </header>

          <div className="card__bin-display">
            <div className="bin-face" aria-hidden="true">
              🗑️
            </div>
            <div className="bin-face shadow" aria-hidden="true">
              🗑️
            </div>
            <p className={messageClassName}>{message}</p>
          </div>

          <footer className="card__footer">
            <p className="card__footer-note">
              {isSuccess ? (
                <>
                  Bin days change sometimes, so give the refresh a whirl whenever you fancy.
                  <strong> Lids down, smiles up!</strong>
                </>
              ) : (
                <>
                  The council site is being shy right now. <strong>Try again in a moment.</strong>
                </>
              )}
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
