// app.js (jQuery + async/await using async function () {}) with external AppStorageManager

$(document).ready(function () {

  function showMessage(message, isError = false) {
    const $msg = $('#statusMessage');
    $msg
      .text(message)
      .removeClass('error success')
      .addClass(isError ? 'error' : 'success')
      .fadeIn(200)
      .delay(1200)
      .fadeOut(400);
  }


  async function refreshKeyList() {
    try {
      const keys = await AppStorageManager.getAllKeys();
      const $keyList = $('#keyList');
      $keyList.empty();

      keys.forEach((key) => {
        const $li = $('<li>').text(key).on('click', async function () {
          $('#keyList li').removeClass('selected');
          $(this).addClass('selected');
          $('#keyInput').val(key);
          try {
            const value = await AppStorageManager.getItem(key);
            $('#valueInput').val(value || '');
          } catch (err) {
            showMessage(err.message, true);
          }
        });
        $keyList.append($li);
      });
    } catch (err) {
      showMessage(err.message, true);
    }
  }


  async function updateStorageType() {
    const selected = $('#storageType').val();
    AppStorageManager.setStorageType(selected);

    // Update the display label
    $('#storageName').text(AppStorageManager.storageDisplayType);

    await refreshKeyList();
    $('#keyInput').val('');
    $('#valueInput').val('');
  }


  $('#storageType').on('change', async function () {
    await updateStorageType();
  });


  $('#getBtn').on('click', async function () {
    const key = $('#keyInput').val();
    if (!key) return;

    try {
      const value = await AppStorageManager.getItem(key);
      $('#valueInput').val(value || '');
      showMessage('Retrieved value.');  
    }
    catch (err) {
      showMessage(err.message, true);
    }
  });


  $('#setBtn').on('click', async function () {
    const key = $('#keyInput').val();
    const value = $('#valueInput').val();
    if (!key) return;

    try {
      await AppStorageManager.setItem(key, value);
      await refreshKeyList();
      showMessage('Saved successfully.');  
    }
    catch (err) {
      showMessage(err.message, true);
    }
  });


  $('#removeBtn').on('click', async function () {
    const key = $('#keyInput').val();
    if (!key) return;
    
    try {
      await AppStorageManager.removeItem(key);
      $('#valueInput').val('');
      await refreshKeyList();
      showMessage('Deleted successfully.');
    }
    catch (err) {
      showMessage(err.message, true);
    }
  });


  $('#clearBtn').on('click', async function () {
    try {
      await AppStorageManager.clear();
      $('#keyInput').val('');
      $('#valueInput').val('');
      await refreshKeyList();
      showMessage('Storage cleared.');
    }
    catch (err) {
      showMessage(err.message, true);
    }
  });


  // Initialize on load
  updateStorageType();
});
