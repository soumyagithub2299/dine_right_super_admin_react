
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const PrivacyPolicyText = () => {
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem('TokenForSuperAdminOfServiceProvider');
  const baseURL = process.env.REACT_APP_SERVICE_PROVIDER_SUPER_ADMIN_BASE_API_URL;

  // Fetch  Privacy Policy from the API
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/admin/cms/ Privacy Policy`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.success) {
          const content = response?.data?.data?.content || '';
          setEditorContent(content);
        } else {
          toast.error(response?.data?.message || 'Failed to load  Privacy Policy.');
        }
      } catch (error) {
        console.error('Error fetching  Privacy Policy:', error);
        toast.error('Failed to load  Privacy Policy. Please try again.');
      }
    };

    fetchTermsAndConditions();
  }, [baseURL, token]);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleSave = async () => {
    if (!editorContent) {
      toast.error('Please enter some text before saving.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/api/admin/cms/Privacy Policy`,
        { content: editorContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success('Privacy Policy saved successfully!');
      } else {
        toast.error(response?.data?.message || 'Failed to save Privacy Policy.');
      }
    } catch (error) {
      console.error('Error saving Privacy Policy:', error);
      toast.error('Failed to save Privacy Policy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Privacy Policy</h2>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['blockquote'],
            [{ align: [] }],
            ['image', 'code-block'],
          ],
        }}
        formats={[
          'header',
          'font',
          'list',
          'bold',
          'italic',
          'underline',
          'link',
          'blockquote',
          'align',
          'image',
          'code-block',
        ]}
        placeholder="Enter your Privacy Policy here..."
        style={{ height: '350px', width: '100%' }} 
      />
      <div style={{ marginTop: '60px',textAlign:"center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
          style={{ width: '50%' }}
        >
          {loading ? 'Saving...' : 'Save Privacy Policy'}
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicyText;