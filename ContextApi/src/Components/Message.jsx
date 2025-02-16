import { useState } from "react";


export default function MessagingApp() {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Alice", messages: ["Hello!", "How are you?"] },
    { id: 2, name: "Bob", messages: ["Hey there!", "What's up?"] },
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const selectConversation = (id) => {
    setSelectedConversation(conversations.find((conv) => conv.id === id));
  };

  const sendMessage = () => {
    if (selectedConversation && newMessage.trim()) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, messages: [newMessage, ...conv.messages] }
            : conv
        )
      );
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/3 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className="p-2 cursor-pointer hover:bg-gray-700 rounded"
          >
            {conv.name}
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {selectedConversation ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Chat with {selectedConversation.name}
            </h2>
            <div className="flex-1 overflow-y-auto border p-2 mb-4 h-64">
              {selectedConversation.messages.map((msg, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800 text-white"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">Select a conversation</p>
        )}
      </div>
    </div>
  );
}
