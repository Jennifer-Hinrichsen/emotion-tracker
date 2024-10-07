import { emotions } from "@/lib/emotions";

export default function EmotionForm() {
  return (
    <>
      <h2>Add new Emotion</h2>
      <form>
        <label htmlFor="emotion">Emotion (Type)</label>
        <select id="emotion" name="emotion">
          <option value="">---Choose an emotion---</option>
          {emotions.map((emotion) => {
            return <option key={emotion} value={emotion}></option>;
          })}
        </select>
      </form>
    </>
  );
}
