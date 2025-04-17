import axios from 'axios'


export function Modal3({ show, onClose, destinations, description, setDescription }) {
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:3000/destinations/${destinations.id}.json`, {
        description,
      });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <h2>Edit Description</h2>
      <textarea value={description} onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
