function Contact(){
    return(
        <div className="contact-form-container mt-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2>Contact Us</h2>
          <form>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: ".5rem" }}>
                Name:
              </label>
              <input type="text" id="name" name="name" required style={{ width: "100%", padding: ".5rem", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: ".5rem" }}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"  required style={{ width: "100%", padding: ".5rem", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="message" style={{ display: "block", marginBottom: ".5rem" }}>
                Message:
              </label>
              <textarea  id="message"  name="message"   required
                rows="5"  style={{ width: "100%", padding: ".5rem", borderRadius: "5px", border: "1px solid #ccc" }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#007BFF", color: "white", border: "none",padding: "0.5rem 1rem",borderRadius: "5px",cursor: "pointer", }}
            >
              Submit
            </button>
          </form>
      </div>
    )
}
export default Contact