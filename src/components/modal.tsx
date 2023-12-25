import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TwitterShareButton } from "react-share";

function MyVerticallyCenteredModal(props: any){

  const shareMessage = `I scored ${props.score} points in the music ranking game! 🎵🎉 and my highest score is ${parseInt(localStorage.getItem("highScore") || '0')} Try to beat my score!`;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          SoundRank
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>High Score: {parseInt(localStorage.getItem("highScore") || '0')}</h4>
        <h4>Current Score: {props.score}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.playAgain}>Play Again</Button>
        <TwitterShareButton
          url={window.location.href}
          title={shareMessage}
          hashtags={["SoundRank"]}
        >
          <Button variant="success">Share on Twitter</Button>
        </TwitterShareButton>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;