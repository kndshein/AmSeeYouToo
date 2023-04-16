import styles from './About.module.scss';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import patch_notes from '../../assets/patch-notes.json';

type PropTypes = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function About({ isModalOpen, setIsModalOpen }: PropTypes) {
  return (
    <Modal
      isOpen={isModalOpen}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <button
        className={styles.close_btn}
        onClick={() => setIsModalOpen(false)}
      >
        <IoMdClose />
      </button>
      <section className={styles.container}>
        <h1 className={styles.title}>AmSeeYou</h1>
        <section className={styles.body}>
          <p>
            <span>AmSeeYou</span> showcases and cherishes the Marvel Cinematic
            Universe (MCU) films and TV shows. This website presents the entire
            universe in in-universe chronological order from{' '}
            <a
              href="https://www.digitalspy.com/movies/a825774/marvel-cinematic-universe-in-chronological-order/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Spy
            </a>
            .
          </p>
          <p>
            The project was conceived in January of 2021 as a class project
            after having learned what React was just a week prior. During the
            project, I fell in love with the process of bringing json objects to
            life -- it's satisfyingly beautiful. Even though the project is long
            over, I have been adding new features and building on existing code
            ever since.
          </p>
          <p>
            I will continue to maintain the site as long as it still brings me
            joy. Here's to small things in life!
          </p>
          <p>
            Warmly,
            <br /> Kaung <br />
            <a
              href="https://knds.art"
              target="_blank"
              rel="noopener noreferrer"
            >
              knds.art
            </a>
          </p>
        </section>
        <table className={styles.table_container}>
          <tbody>
            {[...patch_notes].reverse().map(({ version, date, notes }, idx) => {
              return (
                <tr
                  key={version}
                  className={`${styles.row} ${idx == 0 ? styles.current : ''}`}
                >
                  <td className={styles.version}>{version}</td>
                  <td className={styles.date}>{date}</td>
                  <td className={styles.notes_container}>
                    {notes.map((note, idx) => (
                      // To display <i></i> and other decorating tags without extra styling
                      <span
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: note }}
                      />
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          Special shoutout to{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>{' '}
          for the API, and{' '}
          <a
            href="https://30000fps.com/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            30000fps
          </a>{' '}
          for the{' '}
          <a
            href="https://giphy.com/gifs/loop-sci-fi-XmppNRlrlu2SA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sci-fi GIF
          </a>
          .
        </p>
      </section>
    </Modal>
  );
}
