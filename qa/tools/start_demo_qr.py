"""Generate a real QR image with a harmless text payload, never eSIM credentials.
Requires qrcode[pil]. No user input, URLs, accounts or provisioning requests.
"""
from pathlib import Path
import qrcode

payload = "OPENLINE QA DEMO\nNot an installable eSIM.\nProfile: OL-DEMO-2048"
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8, border=4)
qr.add_data(payload)
qr.make(fit=True)
qr.make_image(fill_color="#0B0B0F", back_color="white").save(
    Path(__file__).resolve().parents[1] / "assets" / "start-demo-qr.png"
)
print("Generated harmless demo QR. Payload:", repr(payload))
