<button
  type="button"
  onClick={() => setFeedbackOpen(true)}
  className="fixed bottom-6 left-6 z-50 rounded-full border border-[#E6E8EC] bg-white px-4 py-3 text-xs font-semibold text-[#152533] shadow-lg transition hover:bg-[#F7F8FA]"
>
  Share feedback
</button>

{feedbackOpen && (
  <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/20 p-4 sm:items-center">
    <div className="w-full max-w-md rounded-2xl border border-[#E6E8EC] bg-white p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#152533]">Share feedback</h3>
          <p className="mt-1 text-sm leading-6 text-[#667085]">
            Tell us what to improve, add, or fix in the cabin optimizer.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFeedbackOpen(false);
            setFeedbackSent(false);
          }}
          className="rounded-md px-2 py-1 text-sm text-[#667085] hover:bg-[#F7F8FA]"
        >
          ✕
        </button>
      </div>

      {feedbackSent ? (
        <div className="mt-5 rounded-xl bg-[#F7F8FA] p-4">
          <p className="text-sm font-medium text-[#152533]">Thank you — feedback saved.</p>
          <p className="mt-1 text-sm text-[#667085]">
            We’ll use this to prioritize future updates.
          </p>
        </div>
      ) : (
        <form onSubmit={submitFeedback} className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-[11px] font-medium text-[#667085]">
              Feedback type
            </label>
            <select
              value={feedbackType}
              onChange={(event) => setFeedbackType(event.target.value)}
              className="h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none"
            >
              <option>General feedback</option>
              <option>Bug report</option>
              <option>Feature request</option>
              <option>Cabin data issue</option>
              <option>Design / usability</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium text-[#667085]">
              Message
            </label>
            <textarea
              required
              value={feedbackMessage}
              onChange={(event) => setFeedbackMessage(event.target.value)}
              placeholder="What should we improve?"
              rows={5}
              className="w-full resize-none rounded-md border border-[#E6E8EC] bg-white px-3 py-2 text-sm text-[#152533] outline-none placeholder:text-[#98A2B3]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium text-[#667085]">
              Email optional
            </label>
            <input
              type="email"
              value={feedbackEmail}
              onChange={(event) => setFeedbackEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none placeholder:text-[#98A2B3]"
            />
          </div>

          <button
            type="submit"
            className="h-10 w-full rounded-md px-4 text-sm font-medium text-white transition hover:bg-[#5B3FEA]"
            style={{ background: COLORS.accent }}
          >
            Submit feedback
          </button>
        </form>
      )}
    </div>
  </div>
)}