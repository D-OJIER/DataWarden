
import { useState, useRef, useEffect } from 'react';

interface ChatSectionProps {
  data: any[];
}

export default function ChatSection({ data }: ChatSectionProps) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Ask me anything about your uploaded data!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSend() {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Answer this about the uploaded data like in a conversation: ${input}\nData: ${JSON.stringify(data.slice(0, 20))}` }),
        cache: 'no-store'
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const errorJson = JSON.parse(text);
          throw new Error(errorJson.error || 'Failed to get AI response');
        } catch (e) {
          throw new Error(`Server error: ${response.status} - ${text.substring(0, 100)}`);
        }
      }
      const result = await response.json();
      setMessages(msgs => [...msgs, { sender: 'ai', text: result.insight || 'No response.' }]);
    } catch (err: any) {
      setMessages(msgs => [...msgs, { sender: 'ai', text: err.message }]);
      setError(err.message);
    }
    setLoading(false);
    setInput('');
  }

  // Auto-scroll to bottom when messages change
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  return (
    <div className="bg-card border border-border rounded-xl p-4 mt-6 shadow-lg w-full max-w-2xl mx-auto flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-center">Chat with AI about your data</h3>
      <div className="flex flex-col gap-2 mb-4 max-h-[40vh] overflow-y-auto scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`px-3 py-2 rounded-lg text-sm md:text-base max-w-[80vw] md:max-w-[60%] break-words ${msg.sender === 'ai' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-lg text-sm bg-accent text-accent-foreground animate-pulse">AI is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <button
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors text-sm md:text-base"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
