'use client'

import { useState } from 'react'

export default function Home() {
  const [paragraphs, setParagraphs] = useState<number>(3)
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(false)
  const [includePTags, setIncludePTags] = useState<boolean>(false)
  const [generatedText, setGeneratedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const generateText = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paragraphs,
          includeHeaders,
          includePTags,
        }),
      })
      const data = await response.json()
      setGeneratedText(data.text)
    } catch (error) {
      console.error('Failed to generate text:', error)
    }
    setLoading(false)
  }

  const clearText = () => {
    setGeneratedText('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          John Wick Lorem Ipsum Generator
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-1">
                Number of Paragraphs
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-full border rounded-md p-2 text-stone-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-1">
                Include Headers
              </label>
              <select
                onChange={(e) => setIncludeHeaders(e.target.value === 'true')}
                value={includeHeaders.toString()}
                className="w-full border rounded-md p-2 text-stone-500"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="includePTags"
              checked={includePTags}
              onChange={(e) => setIncludePTags(e.target.checked)}
              className="h-4 w-4 text-purple-600"
            />
            <label htmlFor="includePTags" className="ml-2 text-sm text-stone-700">
              Include &lt;p&gt; tags
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateText}
              disabled={loading}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
            <button
              onClick={clearText}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </div>

        {generatedText && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: generatedText }}
            />
          </div>
        )}
      </div>
    </main>
  )
}
