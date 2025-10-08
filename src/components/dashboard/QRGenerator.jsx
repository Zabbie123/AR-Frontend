import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { restaurantService } from '../../services/restaurantService';

const QRGenerator = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuUrl, setMenuUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await restaurantService.getRestaurant();
        setRestaurant(response.data);
        
        // Generate menu URL based on restaurant slug
        const url = `${window.location.origin}:5173/menu/${response.data.slug}`;
        setMenuUrl(url);
      } catch (err) {
        console.error('Error fetching restaurant:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${restaurant?.name || 'menu'}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Menu QR Code</h2>
      
      <div className="qr-container flex flex-col items-center">
        <div className="qr-code mb-4">
          <QRCodeSVG
            id="qr-canvas"
            value={menuUrl}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>
        
        <div className="qr-actions flex gap-2 mb-6">
          <Button onClick={downloadQR}>
            Download QR Code
          </Button>
          <Button variant="secondary" onClick={copyLink}>
            {copied ? 'Copied!' : 'Copy Menu Link'}
          </Button>
        </div>
      </div>
      
      <div className="menu-url">
        <label className="block text-sm font-medium text-gray-700 mb-1">Menu URL:</label>
        <div className="url-container flex">
          <input 
            type="text" 
            value={menuUrl} 
            readOnly 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
          />
          <button 
            onClick={copyLink}
            className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
          >
            Copy
          </button>
        </div>
      </div>
      
      <div className="preview-section mt-6">
        <h3 className="text-lg font-medium mb-2">Preview Menu</h3>
        <a 
          href={menuUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800"
        >
          Open Menu in New Tab
        </a>
      </div>
    </div>
  );
};

export default QRGenerator;