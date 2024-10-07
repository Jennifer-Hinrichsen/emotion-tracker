import { emotions } from "@/lib/emotions";

export default function EmotionForm() {
  return (
    <>
      <h2>Add new Emotion</h2>
      <form>
        <label htmlFor="emotion">Emotion (Type)</label>
        <select id="emotion" name="emotion">
          <option value={""}>Please choose an option</option>
        </select>
      </form>
    </>
  );
}
