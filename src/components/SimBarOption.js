import { Button, Card, CardText } from 'reactstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card body outline color="primary" className="sim-option">
      <CardText>{section.description}</CardText>
      <Button outline color='primary' onClick={() => setSection(section.name)}>
        {section.name}
      </Button>
    </Card>
  );
}

SimBarOption.propTypes = {
  setSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
}
