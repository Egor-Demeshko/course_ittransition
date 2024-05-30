<a class="logo_wrapper" href="/">
    <div class="circle">
        <span> L </span>
    </div>
    <p class="logo">LOGOTYPE</p>
</a>

<style>
    .logo_wrapper {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        color: var(--logo-color);
        text-decoration: none;
    }

    .circle {
        background-color: var(--logo-background);
        position: relative;
        border-radius: 50%;
        width: 24px;
        height: 24px;
    }

    .circle span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Poppins, sans-serif;
        font-weight: 800;
        font-size: 0.825rem;
    }

    .logo {
        font-family: Poppins, sans-serif;
        font-weight: 800;
        font-size: 0.825rem;
        line-height: 0.825rem;
        text-transform: uppercase;
        color: var(--logo-background);
    }
</style>
